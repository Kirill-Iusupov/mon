/* eslint-disable no-unused-vars */
const send = require("../utils/send");
const validate = require("../utils/validator");
const Config = require("../utils//config");
const RegisterSchema = require("./registerSchema");
const RegisterService = require("./registerService");

const CHECK_TUNDUK = Config.CHECK_TUNDUK === "true" ? true : false;
class RegisterController {
  async challenger(req, res) {
    try {
      const isValid = validate(req.body, RegisterSchema.challengerSchema);
      if (!isValid) {
        return send(res, false, req.t("inValidFormat"), true, 400);
        // return res.json({
        //   message:
        //     req.body.lang == "kg"
        //       ? "Маалыматтарды туура толтуруңуз"
        //       : "Заполните все поля правильно",
        //   type: "error",
        //   register: false,
        // });
      }
      if (Config.REGISTER_ALLOW==='false') {
        return send(res, false, "Закончился срок регистрации", true, 400);
        // return send(res, false, req.t("inValidFormat"), true, 400);
      }
      const { body } = req;
      const {
        lang,
        surname,
        name,
        middlename,
        dateBirth,
        gender,
        passport,
        datePassport,
        email,
        password,
        tel,
        pin: pinString,
      } = body;

      const age = RegisterService.getAge(dateBirth);
      if (age < 20 || age > 45) {
        return send(res, false, req.t("register.ageError"), true, 400);
      }
      const pin = Number(pinString);

      const isPinExist = await RegisterService.isPinExist(pin);
      if (isPinExist) {
        return send(res, false, req.t("register.pinExist"), true, 400);

        // return res.status(200).json({
        //   message:
        //     lang == "ru"
        //       ? "Пользователь с таким ПИН/ИНН уже существует!"
        //       : "Мындай ПИН/ИНН менен колдонуучу бар!",
        //   type: "warn",
        // });
      }
      const isEmailExist = await RegisterService.isEmailExist(email);
      if (isEmailExist) {
        return send(res, false, req.t("register.emailExist"), true, 400);
      }
      let name2DB = name,
        surname2DB = surname,
        middlename2DB = middlename || "",
        dateBirth2DB = dateBirth,
        gender2DB = gender,
        tel2DB = `0${String(tel).slice(3, 12)}`;
      if (pin && CHECK_TUNDUK) {
        const requestXML = await RegisterService.dataByPin(pin);
        const { data: dataTunduk, error: errorTunduk } =
          await RegisterService.fetchData(requestXML);
        if (errorTunduk) {
          return send(
            res,
            false,
            req.t("register.pinOrPassportInCorrect"),
            true,
            400
          );

          //   return res.json({
          //     message:
          //       lang == "ru"
          //         ? "ПИН указан не верно или паспортные данные неверны"
          //         : "ПИН туура эмес көрсөтүлгөн же паспорттун маалыматтары туура эмес",
          //     type: "error",
          //     register: false,
          //   });
        }
        if (dataTunduk.name.toLowerCase() != name.toLowerCase().trim()) {
          return send(res, false, req.t("register.nameInCorrect"), true, 400);

          //   return res.status(200).json({
          //     message:
          //       lang == "ru"
          //         ? "Введите ваше имя правильно!"
          //         : "Атыңызды туура жазыңыз!",
          //     register: false,
          //     type: "error",
          //   });
        }

        if (dataTunduk.surname.toLowerCase() != surname.toLowerCase().trim()) {
          return send(
            res,
            false,
            req.t("register.surnameInCorrect"),
            true,
            400
          );

          //   return res.status(200).json({
          //     message:
          //       lang == "ru"
          //         ? "Введите вашу фамилию правильно!"
          //         : "Фамилияңызды туура жазыңыз!",
          //     register: false,
          //     type: "error",
          //   });
        }

        if (dataTunduk.dateOfBirth != dateBirth) {
          return send(
            res,
            false,
            req.t("register.dateBirthInCorrect"),
            true,
            400
          );
          //   return res.status(200).json({
          //     message:
          //       lang == "ru"
          //         ? "Введите правильный день рождения!"
          //         : "Туулган күнүңүздү туура жазыңыз!",
          //     register: false,
          //     type: "error",
          //   });
        }

        name2DB = dataTunduk.name;
        surname2DB = dataTunduk.surname;
        middlename2DB = dataTunduk.patronymic;
        dateBirth2DB = dataTunduk.dateOfBirth;
        gender2DB = dataTunduk.gender;

        console.log("XML", dataTunduk.pin);
        // console.log('XML', dataTunduk)
      }

      const hashPassword = RegisterService.md5(password);

      const insertChallenger = RegisterService.insertChallenger(
        surname2DB,
        name2DB,
        middlename2DB,
        pin,
        parseInt(gender2DB),
        dateBirth2DB,
        passport,
        datePassport,
        tel2DB,
        email,
        hashPassword
      );

      if (insertChallenger) {
        //ok
        return send(res, true, req.t("register.success"), true, 200);
        // return res.status(200).json({
        //   message:
        //     lang == "ru"
        //       ? "Вы успешно зарегистрированы!"
        //       : "Сиз ийгиликтүү катталдыңыз!",
        //   type: "success",
        //   register: true,
        // });
      }

      if (insertChallenger == false) {
        //db save error
        return send(
          res,
          false,
          req.t("register.dbInsertChallengerError"),
          true,
          400
        );

        // return res.status(200).json({
        //   message:
        //     lang == "ru"
        //       ? "Ошибка, не удалось сохранить!"
        //       : "Туура эмес, маалыматтар сакталган жок!",
        //   type: "warn",
        //   register: false,
        // });
      }
      return send(res, false, req.t("register.unknownError"), true, 400);

      //   return res.json({
      //     message:
      //       lang == "ru" ? "Ошибка, неизвестная!" : "Туура эмес, белгисиз ката!",
      //     type: "warn",
      //     register: false,
      //   });
    } catch (error) {
      console.log("Error register user", error);
      return send(res, false, req.t("register.tryError"), true, 400);

      //   return res.json({
      //     message: "Ошибка, попробуйте еще раз!",
      //     type: "error",
      //     register: false,
      //   });
    }
  }
}

module.exports = new RegisterController();

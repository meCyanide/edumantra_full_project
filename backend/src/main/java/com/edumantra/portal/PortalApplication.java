package com.edumantra.portal;

import com.edumantra.portal.model.Superuser;
import com.edumantra.portal.model.ClassDetail;
import com.edumantra.portal.model.User;
import com.edumantra.portal.repository.SuperuserRepository;
import com.edumantra.portal.repository.ClassDetailRepository;
import com.edumantra.portal.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class PortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortalApplication.class, args);
    }

    @Bean
    public CommandLineRunner seedDatabase(
            SuperuserRepository superuserRepository,
            UserRepository userRepository,
            ClassDetailRepository classDetailRepository) {
        return args -> {
            if (superuserRepository.count() == 0) {
                Superuser admin = new Superuser();
                admin.setSuperusersid(java.util.concurrent.ThreadLocalRandom.current().nextInt(100000, 999999999));
                admin.setSuperusersname("Rupankar Paul");
                admin.setSuperusersemailid("admin@edumantra.com");
                admin.setSuperusersphoneno("9999999999");
                admin.setSuperuserspasswords("rupankar123");
                admin.setSuperusersrequestdate(LocalDateTime.now());
                admin.setSuperusersrole("superadmin");
                admin.setSuperusersactiveflag("Y");
                admin.setSuperusersapproveby("system");
                superuserRepository.save(admin);
            }

            if (userRepository.count() == 0) {
                User teacher = new User();
                teacher.setUserid(java.util.concurrent.ThreadLocalRandom.current().nextInt(100000, 999999999));
                teacher.setUsername("Rupankar Paul");
                teacher.setUseremailid("teacher@edumantra.com");
                teacher.setUserphonenumber("8888888888");
                teacher.setUserpassword("dummy123");
                teacher.setUsercreateTs(LocalDateTime.now());
                teacher.setUserrole("teacher");
                teacher.setUseractiveFlag("Y");
                userRepository.save(teacher);

                User student = new User();
                student.setUserid(java.util.concurrent.ThreadLocalRandom.current().nextInt(100000, 999999999));
                student.setUsername("Rupankar Paul");
                student.setUseremailid("student@edumantra.com");
                student.setUserphonenumber("7777777777");
                student.setUserpassword("dummy123");
                student.setUsercreateTs(LocalDateTime.now());
                student.setUserrole("student");
                student.setUseractiveFlag("Y");
                userRepository.save(student);
            }

            if (classDetailRepository.count() == 0) {
                ClassDetail polity = new ClassDetail();
                polity.setClassid(java.util.concurrent.ThreadLocalRandom.current().nextInt(100000, 999999999));
                polity.setSubjectName("Advance Polity");
                polity.setTeacherName("Rupankar Paul");
                polity.setClassDays("Monday, Wednesday, Friday");
                polity.setClassTime(
                        LocalDateTime.now().plusDays(2).withHour(10).withMinute(0).withSecond(0).withNano(0));
                polity.setCreateTs(LocalDateTime.now());
                polity.setClassJoinlink("https://www.google.com/");
                classDetailRepository.save(polity);
            }
        };
    }
}

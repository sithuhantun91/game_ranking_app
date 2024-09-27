//package com.sithuhantun.game_ranking_system.config;
//
//import com.okta.spring.boot.oauth.Okta;
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.util.matcher.RequestMatcher;
//import org.springframework.web.accept.ContentNegotiationStrategy;
//import org.springframework.web.accept.HeaderContentNegotiationStrategy;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//public class SecurityConfig {
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//        // protect endpoint /api/users?page=**&size=**
//        http.authorizeHttpRequests(configurer -> configurer
//                        .requestMatchers(new CustomRequestMatcher())
//                        .authenticated()
//                )
//                .oauth2ResourceServer(oauth2-> oauth2.jwt(withDefaults()));
//
//        // add CORS filters
//        http.cors(withDefaults());
//
//        // add content negotiation strategy
//        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());
//
//        // force a non-empty response body for 401's to make the response more friendly
//        Okta.configureResourceServer401ResponseBody(http);
//
//        // disable CSRF since we are not using cookies for session tracking
//        http.csrf(AbstractHttpConfigurer::disable);
//
//        return http.build();
//    }
//
//    public static class CustomRequestMatcher implements RequestMatcher {
//        @Override
//        public boolean matches(HttpServletRequest request) {
//            String path = request.getRequestURI();
//            String page = request.getParameter("page");
//            String size = request.getParameter("size");
//            return path.equals("/api/users") && page != null && size != null;
//        }
//    }
//}
//
//

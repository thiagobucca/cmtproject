package com.cmt.myapp.web.rest.util;

import java.nio.charset.Charset;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.codec.Base64;

/**
 * Utility class for HTTP headers creation.
 */
public final class RequestUtil {

    private static final Logger log = LoggerFactory.getLogger(HeaderUtil.class);

    private static final String APPLICATION_NAME = "cmtprojectApp";

    private RequestUtil() {
    }

    public static HttpHeaders createHeaders(String username, String password){
        return new HttpHeaders() {{
            String authHeader = "Basic fasdfasfsadfasfasf";
              set( "Authorization", authHeader );
           }};
     }
}

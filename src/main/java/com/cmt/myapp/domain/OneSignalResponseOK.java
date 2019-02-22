package com.cmt.myapp.domain;




import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class OneSignalResponseOK implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    private Long recipients;

    /**
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return the recipients
     */
    public Long getRecipients() {
        return recipients;
    }

    /**
     * @param recipients the recipients to set
     */
    public void setRecipients(Long recipients) {
        recipients = recipients;
    }


    

}


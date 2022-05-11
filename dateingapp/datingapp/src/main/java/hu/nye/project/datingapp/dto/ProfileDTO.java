package hu.nye.project.datingapp.dto;

import javax.persistence.ElementCollection;
import javax.validation.constraints.NotNull;
import java.util.Set;

public class ProfileDTO {

    private Long id;

    @NotNull
    private Long userID;

    private String description;

    @ElementCollection
    private Set<String> interests;

    private String imagePath;

    public ProfileDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<String> getInterests() {
        return interests;
    }

    public void setInterests(Set<String> interests) {
        this.interests = interests;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}

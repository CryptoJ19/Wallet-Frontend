<template>
  <div class="land">
    <Menu :mode="'nav-off'" />
    <div class="member">
      <div class="member__bg">
        <img
          src="~assets/imgs/member__bg.svg"
          alt="bg"
        >
      </div>
      <div class="member__content land__container">
        <div class="member__nav">
          <div class="nav">
            <div class="nav__item">
              <nuxt-link :to="`/`">
                Home
              </nuxt-link>
            </div>
            <div class="nav__point" />
            <div class="nav__item">
              {{ person.title }}
            </div>
          </div>
        </div>
        <div class="member__item member__cloud">
          <div class="cloud">
            <div
              class="cloud__ava"
              :style="`background-image: url(${imagePath(person.image)})`"
            />
            <div class="cloud__content">
              <div class="member__title member__mobile-title">
                {{ person.title }}
              </div>
              <div class="member__title">
                Contacts
              </div>
              <div class="contact contact__items">
                <div
                  v-if="person.mail"
                  class="contact__item"
                >
                  <div class="contact__icon">
                    <img
                      src="~assets/imgs/icons/member__mail.svg"
                      alt="bg"
                    >
                  </div>
                  <div class="contact__value">
                    {{ person.mail }}
                  </div>
                </div>
                <div
                  v-if="person.inNick"
                  class="contact__item"
                >
                  <div class="contact__icon">
                    <img
                      src="~assets/imgs/icons/member__in.svg"
                      alt="bg"
                    >
                  </div>
                  <div class="contact__value">
                    <a
                      target="_blank"
                      :href="`http://${person.inNick}`"
                    >
                      www.linkedin.com
                    </a>
                  </div>
                </div>
                <!--                <div class="contact__item">-->
                <!--                  <div class="contact__icon">-->
                <!--                    <img-->
                <!--                      src="~assets/imgs/icons/member__map.svg"-->
                <!--                      alt="bg"-->
                <!--                    >-->
                <!--                  </div>-->
                <!--                  <div class="contact__value">-->
                <!--                    example@email.ru-->
                <!--                  </div>-->
                <!--                </div>-->
              </div>
              <div
                v-if="person.birthday"
                class="birthday"
              >
                <div class="member__title">
                  Birthday
                </div>
                <div class="contact contact__items">
                  <div
                    class="contact__item"
                  >
                    <div class="contact__icon">
                      <img
                        src="~assets/imgs/icons/birthday.svg"
                        alt="bg"
                      >
                    </div>
                    <div class="contact__value">
                      {{ person.birthday }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="person.education"
                class="education"
              >
                <div class="member__title">
                  Education
                </div>
                <div class="education education__items">
                  <div
                    v-for="(item, i) in Object.keys(person.education)"
                    :key="`education-${i}`"
                    class="education__item"
                  >
                    <div class="education__title">
                      {{ person.education[item].title }}
                    </div>
                    <div class="education__text">
                      {{ person.education[item].text }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="member__header member__item">
          <div class="member__name">
            {{ person.title }}
          </div>
          <div class="member__role">
            {{ person.sub }}
          </div>
        </div>
        <div class="member__item member__main">
          <div class="main">
            <div
              v-if="person.language && Object.keys(person.language).length !== 0"
              sclass="language"
            >
              <div class="member__title">
                Language
              </div>
              <div class="member__language">
                <div class="language__items">
                  <div
                    v-for="language in Object.keys(person.language)"
                    :key="`language-${language}`"
                    class="language__item"
                  >
                    <div class="language__icon">
                      <img
                        :src="getFlagImg(language)"
                        alt="flag"
                      >
                    </div>
                    <div class="language__name">
                      {{ $t(`main.languages.${language}`) }}
                    </div>
                    <div class="language__point" />
                    <div class="language__line line">
                      <div
                        class="line__filler"
                        :style="{ width: `${person.language[language]}%` }"
                      />
                    </div>
                    <div class="language__value">
                      {{ person.language[language] }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="member__title">
              Expertise
            </div>
            <div class="member__desc">
              {{ person.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script src="./script.js" />
<style lang="scss" src="./style.scss" />

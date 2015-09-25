#istype
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool isctype(char_type c, char_class_type f) const;
```


##概要
文字`c`がクラス`f`に属しているかを判定する。


##戻り値
ビットマスクのクラス値`f`に含まれるいずれかのクラスに文字`c`が属していれば`true`、そうでなければ`false`を返す。


##例
```cpp
#include <iostream>
#include <regex>
#include <string>

int main()
{
  std::regex_traits<char> traits;
  
  std::string class_name = "alnum"; // 正規表現中で[[:alnum:]]のように入力するクラス名
  
  // 文字'a'がアルファベットと数字のクラスに含まれているかを判定する
  std::regex_traits<char>::char_class_type class_value =
    traits.lookup_classname(class_name.begin(), class_name.end());
  if (traits.isctype('a', class_value)) {
    std::cout << "'a' is alpha-numeric class" << std::endl;
  }
  else {
    std::cout << "'a' is not alpha-numeric class" << std::endl;
  }
}
```
* std::string[link /reference/string/basic_string.md]
* begin()[link /reference/string/basic_string/begin.md]
* end()[link /reference/string/basic_string/end.md]
* lookup_classname[link ./lookup_classname.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
'a' is alpha-numeric class
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


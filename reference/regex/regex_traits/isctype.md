# isctype
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool isctype(char_type c, char_class_type f) const;
```


## 概要
文�`c`がクラス`f`に属しているかを判定する。


## 戻り値
ビットマスクのクラス値`f`に含まれるいずれかのクラスに文�`c`が属していれば`true`、そうでなければ`false`を返す。


## 例
```cpp example
#include <iostream>
#include <regex>
#include <string>

int main()
{
  std::regex_traits<char> traits;

  std::string class_name = "alnum"; // �規表現�で[[:alnum:]]のように入力するクラス名

  // 文�'a'がアルファベットと数�のクラスに含まれているかを判定する
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
* isctype[color ff0000]
* class_name.begin()[link /reference/string/basic_string/begin.md]
* class_name.end()[link /reference/string/basic_string/end.md]
* lookup_classname[link lookup_classname.md]

### 出力
```
'a' is alpha-numeric class
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2018. [CD] `regex_traits::isctype` Returns clause is wrong](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2018)
    - C++14から、戻り値の仕様文面が見直された。



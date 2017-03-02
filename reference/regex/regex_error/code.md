#code
* regex[meta header]
* std[meta namespace]
* regex_error[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
regex_constants::error_type code() const;
```
* regex_constants::error_type[link /reference/regex/regex_constants/error_type.md]

##概要
エラーコードを取得する。


##戻り値
コンストラクタで設定されたエラーコードを返す。


##例
```cpp
#include <regex>

int main()
{
  try {
    std::regex re("("); // 開きカッコに対応する閉じカッコがない正規表現を指定
  }
  catch (std::regex_error& e) {
    // エラーコードを取得
    std::regex_constants::error_type code = e.code();
  }
}
```
* code()[color ff0000]
* std::regex[link /reference/regex/basic_regex.md]
* std::regex_constants::error_type[link /reference/regex/regex_constants/error_type.md]

###出力
```
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

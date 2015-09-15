#コンストラクタ (C++11)
* regex[meta header]
* std[meta namespace]
* regex_error[meta class]
* function[meta id-type]

```cpp
explicit regex_error(regex_constants::error_type ecode);
```
* regex_constants::error_type[link /reference/regex/regex_constants/error_type.md]

##概要
エラーコードを受け取ってオブジェクトを構築する。


##例
```cpp
#include <regex>

int main()
{
  // 開き丸カッコに対応した閉じ丸カッコがない、というエラーコードの例外を送出
  throw std::regex_error(std::regex_constants::error_paren);
}
```
* std::regex_constants::error_paren[link /reference/regex/regex_constants/error_type.md]

###出力
```
Segmentation fault
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

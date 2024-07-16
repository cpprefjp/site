# コンストラクタ
* regex[meta header]
* std[meta namespace]
* regex_error[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit regex_error(regex_constants::error_type ecode);
```
* regex_constants::error_type[link /reference/regex/regex_constants/error_type.md]

## 概要
エラーコードを受け取ってオブジェクトを構築する。


## 例
```cpp example
#include <regex>

int main()
{
  // 開き丸カッコに対応した閉じ丸カッコがない、というエラーコードの例外を送出
  throw std::regex_error(std::regex_constants::error_paren);
}
```
* std::regex_constants::error_paren[link /reference/regex/regex_constants/error_type.md]

### 出力
```
Segmentation fault
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified], 4.9.1 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

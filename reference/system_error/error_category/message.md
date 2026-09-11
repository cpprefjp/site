# message
* system_error[meta header]
* std[meta namespace]
* error_category[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
virtual string message(int ev) const = 0;
```
* string[link /reference/string/basic_string.md]

## 概要
エラーコードに対応するメッセージを取得する


## 戻り値
エラーコードを説明するメッセージを返す

- C++11 : 文字列のエンコーディングは未規定（実装によってCロケールのエンコーディングだったり、Windowsのコードページ (ACP) だったりと移植可能に扱えなかった）
- C++29 : 文字列は、実行文字集合のマルチバイト文字列であると規定された


## 例
```cpp example
#include <iostream>
#include <system_error>
#include <string>
#include <cerrno>

int main()
{
  const std::error_category& cat = std::generic_category();

  std::string msg = cat.message(ENOTDIR);
  std::cout << msg << std::endl;
}
```
* message[color ff0000]
* std::generic_category()[link /reference/system_error/generic_category.md]
* ENOTDIR[link /reference/cerrno.md]

### 出力
```
Not a directory
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified]


## 参照
- [P3395R6 Fix encoding issues and add a `formatter` for `std::error_code`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3395r6.html)
    - C++29で、返される文字列のエンコーディングが規定された
- [LWG Issue 4156. `error_category` messages have unspecified encoding](https://cplusplus.github.io/LWG/issue4156)
    - エンコーディングが未規定であることを指摘したissue。P3395R6で解決された

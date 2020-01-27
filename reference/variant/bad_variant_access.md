# bad_variant_access
* variant[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  class bad_variant_access : public exception;
}
```
* exception[link /reference/exception/exception.md]

## 概要
`std::bad_variant_access`は、[`std::variant`](/reference/variant/variant.md)オブジェクトが現在保持していない候補型に不�アクセスした際に発生する例外型である。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `bad_variant_access() noexcept;` | デフォルトコンストラクタ | C++17 |
| `const char* what() const noexcept override;` | エラー理由となる実装依�文�列 | C++17 |


## 例
```cpp example
#include <iostream>
#include <variant>
#include <string>

int main()
{
  std::variant<int, char, std::string> v = 3;

  // vは0番目の型 (int) を保持しているが、2番目の型 (string) を取り出そうとした
  try {
    std::string& x = std::get<2>(v);
  }
  catch (std::bad_variant_access& e) {
    std::cout << "error : " << e.what() << std::endl;
  }

  // vはint型を保持しているが、string型を取り出そうとした
  try {
    std::string& x = std::get<std::string>(v);
  }
  catch (std::bad_variant_access& e) {
    std::cout << "error : " << e.what() << std::endl;
  }
}
```
* std::bad_variant_access[color ff0000]
* std::variant[link variant.md]
* std::get[link variant/get.md]

### 出力例
```
error : Unexpected index
error : Unexpected index
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1
- [GCC](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??

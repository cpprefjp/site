# bad_any_cast
* any[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  class bad_any_cast : public bad_cast;
}
```
* bad_cast[link /reference/typeinfo/bad_cast.md]

## 概要
`std::bad_any_cast`は、[`std::any_cast`](any_cast.md)関数の失敗時に発生する例外である。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `bad_any_cast();` | デフォルトコンストラクタ | C++17 |
| `const char* what() const noexcept override;` | エラー理由となる実装依存文字列 | C++17 |


## 例
```cpp example
#include <iostream>
#include <any>

int main()
{
  std::any x = 3;
  try {
    // int型の値が入っているのに、double型として取り出そうとした
    std::any_cast<double>(x);
  }
  catch (std::bad_any_cast& e) {
    std::cout << "exception : " << e.what() << std::endl;
  }
}
```
* std::bad_any_cast[color ff0000]

### 出力例
```
exception : bad any cast
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [LWG Issue 2868. Missing specification of `bad_any_cast::what()`](https://wg21.cmeerw.net/lwg/issue2868)

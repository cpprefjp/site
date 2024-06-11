# bad_expected_access
* expected[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class E>
  class bad_expected_access : public bad_expected_access<void> { ... };

  template<>
  class bad_expected_access<void> : public exception { ... };
}
```
* exception[link /reference/exception/exception.md]

## 概要
`bad_expected_access`は、[`expected`](expected.md)オブジェクトがエラー値を保持しているとき正常値にアクセスした場合に発生する例外である。


## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`(constructor)`](bad_expected_access/op_constructor.md) | コンストラクタ | C++23 |
| `(destructor)` | デストラクタ | C++23 |
| `operator=` | コピー／ムーブ代入演算子 | C++23 |
| [`error`](bad_expected_access/error.md) | エラー値を取得する | C++23 |
| [`what`](bad_expected_access/what.md) | エラー理由の文字列を取得する | C++23 |


## 例
```cpp example
#include <cassert>
#include <expected>
#include <iostream>
#include <string>

int main()
{
  std::expected<int, std::string> x = std::unexpected{"invalid"};

  try {
    assert(not x.has_value());
    int value = x.value();  // bad_expected_access例外発生
    std::cout << "value: " << value << std::endl;
  }
  catch (const std::bad_expected_access<std::string>& ex) {
    std::cout << "error: " << ex.error() << std::endl;
  }
}
```
* std::bad_expected_access[color ff0000]
* std::unexpected[link unexpected.md]

### 出力
```
error: invalid
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`expected`](expected.md)
- [`bad_optional_access`](/reference/optional/bad_optional_access.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
- [P2549R1 `std::unexpected<E>` should have `error()` as member accessor](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2549r1.html)

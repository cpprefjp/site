# what
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* bad_expected_access[meta class]
* cpp23[meta cpp]

```cpp
const char* what() const noexcept override;           // (1) C++23
constexpr const char* what() const noexcept override; // (1) C++26
```

## 概要
エラー理由の文字列を取得する。


## 戻り値
エラー理由となる実装定義の文字列


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <expected>
#include <iostream>
#include <string>

int main()
{
  std::expected<int, std::string> v = std::unexpected{"ERR"};
  try {
    std::cout << v.value() << std::endl;
  } catch (const std::bad_expected_access<std::string>& ex) {
    std::cout << ex.what() << std::endl;
  }
}
```
* what()[color ff0000]
* value()[link ../expected/value.md]
* std::unexpected[link ../unexpected.md]
* std::bad_expected_access[link ../bad_expected_access.md]

### 出力例
```
bad access to std::expected without expected value
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
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
- [P3378R2 `constexpr` exception types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3378r2.html)
    - C++26で`constexpr`対応した

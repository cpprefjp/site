# operator*
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected.void[meta class]
* cpp23[meta cpp]

```cpp
// expected<cv void, E>部分特殊化
constexpr void operator*() const noexcept;
```

## 概要
正常値(`void`)を取得する。


## 事前条件
[`has_value()`](has_value.md) `== true`


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <expected>

int main()
{
  std::expected<void, int> x;
  *x;

  std::expected<void, int> y = std::unexpected{42};
//*y;
  // エラー値を保持する y に対する operator* 呼び出しは未定義動作
}
```
* *x[color ff0000]
* std::unexpected[link ../unexpected.md]

### 出力
```
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
- [`value()`](value.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)

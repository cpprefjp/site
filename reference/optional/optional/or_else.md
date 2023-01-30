# or_else
* optional[meta header]
* function template[meta id-type]
* std[meta namespace]
* optional[meta class]
* cpp23[meta cpp]

```cpp
template<class F> constexpr optional or_else(F&& f) const &; // (1)
template<class F> constexpr optional or_else(F&& f) &&;      // (2)
```

## 概要
有効値を保持していれば、なにもしない。
有効値を保持していなければ、`f()`の呼び出し結果を`optional`として返す。

実際には複数オーバーロードが提供されるが、大まかには下記シグニチャのようにみなせる。
`or_else`へは、空の引数リストをとり`std::optional<T>`へ変換可能な`Return`型を返す関数や関数オブジェクトを与える。

```cpp
template <class T>
class optional {
  template <class Return>
  std::optional<T> or_else(function<Return()> func);
};
```
* function[link /reference/functional/function.md]


## テンプレートパラメータ制約
- (1) : `F`は[`invocable<>`](/reference/concepts/invocable.md)のモデル、かつ`T`は[`copy_constructible`](/reference/concepts/copy_constructible.md)のモデルであること
- (2) : `F`は[`invocable<>`](/reference/concepts/invocable.md)のモデル、かつ`T`は[`move_constructible`](/reference/concepts/move_constructible.md)のモデルであること


## 適格要件
[`is_same_v`](/reference/type_traits/is_same.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F>>, optional>`が`true`であること


## 効果
- (1) : 次と等価

    ```cpp
    if (*this) {
      return *this;
    } else {
      return std::forward<F>(f)();
    }
    ```
    * std::forward[link /reference/utility/forward.md]

- (2) : 次と等価

    ```cpp
    if (*this) {
      return std::move(*this);
    } else {
      return std::forward<F>(f)();
    }
    ```
    * std::move[link /reference/utility/move.md]
    * std::forward[link /reference/utility/forward.md]


## 備考
`or_else`は、メソッドチェーンをサポートするモナド風(monadic)操作として導入された。


## 例
### 基本的な使い方
```cpp example
#include <cassert>
#include <optional>

std::optional<int> defvalue()
{
  return 42;
}

int main()
{
  std::optional<int> o1 = 1;
  assert(o1.or_else(defvalue).value() == 1);

  std::optional<int> o2 = std::nullopt;
  assert(o2.or_else(defvalue).value() == 42);
}
```
* or_else[color ff0000]
* std::nullopt[link ../nullopt_t.md]
* value()[link value.md]


#### 出力
```
```

### メソッドチェインとしての使い方
```cpp example
#include <cassert>
#include <charconv>
#include <optional>
#include <string_view>

std::optional<int> parse(std::string_view sv, int base, std::string_view prefix = "")
{
  if (!prefix.empty() && !sv.starts_with(prefix))
    return std::nullopt;
  int n{};
  auto [ptr, ec] = std::from_chars(sv.data() + prefix.size(), sv.data() + sv.size(), n, base);
  if (ec == std::errc{} && ptr == sv.data() + sv.size())
    return n;
  else
    return std::nullopt;
}

std::optional<int> parse_digit(std::string_view sv)
{
  return parse(sv, 2, "0b")
    .or_else([sv] { return parse(sv, 10); })
    .or_else([sv] { return parse(sv, 16, "0x"); });
}

int main()
{
  assert(parse_digit("0b11") == std::optional(3));
  assert(parse_digit("11") == std::optional(11));
  assert(parse_digit("0x11") == std::optional(17));
  assert(parse_digit("x") == std::nullopt);
}
```
* or_else[color ff0000]
* std::nullopt[link ../nullopt_t.md]
* std::string_view[link ../../string_view/basic_string_view.md]
* std::from_chars[link ../../charconv/from_chars.md]
* std::errc[link ../../system_error/errc.md]
* prefix.empty()[link /reference/string_view/basic_string_view/empty.md]
* prefix.size()[link /reference/string_view/basic_string_view/size.md]
* sv.starts_with[link /reference/string_view/basic_string_view/starts_with.md]


#### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`and_then`](and_then.md)
- [`transform`](transform.md)
- [`value_or`](value_or.md)


## 参照
- [P0798R8 Monadic operations for std::optional](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0798r8.html)

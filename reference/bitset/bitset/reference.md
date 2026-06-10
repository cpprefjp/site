# reference
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* class[meta id-type]

```cpp
namespace std {
  template <size_t N>
  class bitset {
  public:
    class reference {
      friend class bitset;
      CONSTEXPR reference() noexcept;
    public:
      CONSTEXPR ~reference() noexcept;
      CONSTEXPR reference& operator=(bool x) noexcept;
      CONSTEXPR reference& operator=(const reference&) noexcept;
      constexpr const reference& operator=(bool x) const noexcept;   // C++26
      CONSTEXPR bool operator~() const noexcept;
      CONSTEXPR operator bool() const noexcept;
      CONSTEXPR reference& flip() noexcept;

      friend constexpr void swap(reference x, reference y) noexcept;  // C++26
      friend constexpr void swap(reference x, bool& y) noexcept;      // C++26
      friend constexpr void swap(bool& x, reference y) noexcept;      // C++26
    };
  };
}
```
* CONSTEXPR[italic]

## 概要
`bitset::reference`は、`bitset`の各ビットにアクセスするためのプロキシクラスである。`bitset::`[`operator[]`](op_at.md)で返されるビット情報を取得、書き換えるためにある。

C++23から`bitset::reference`全メンバ関数への`constexpr`指定が行われる。

C++26から、`const`修飾された`*this`に対する`bool`からの代入演算子と、ADLで見つかる非メンバ`swap`関数が追加され、[`vector<bool>::reference`](/reference/vector/vector.md)とインタフェースが統一された。


### メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------|----------------------------------------------------------|-------|
| `operator=(bool x)`           | ビット情報を書き換える   | |
| `operator=(const reference&)` | ビット情報をコピーする   | |
| `operator=(bool x) const`     | `const`な`*this`のビット情報を書き換える | C++26 |
| `operator~()`                 | 反転したビットを取得する | |
| `operator bool()`             | `bool`型に変換する       | |
| `flip()`                      | ビットを反転させる       | |


### 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `swap(reference x, reference y)` | 2つの参照先のビットを入れ替える | C++26 |
| `swap(reference x, bool& y)`     | 参照先のビットと`bool`を入れ替える | C++26 |
| `swap(bool& x, reference y)`     | `bool`と参照先のビットを入れ替える | C++26 |


## 例
```cpp example
#include <cassert>
#include <bitset>

int main()
{
  std::bitset<4> bs("1010");

  bs[0] = true; // 書き換え
  assert(bs.to_string() == "1011");

  // 反転したビットを取得
  bool result1 = ~bs[3];
  assert(!result1);

  // boolへの変換
  bool result2 = bs[3];
  assert(result2);

  // ビットを反転させる
  bs[0].flip();
  assert(bs.to_string() == "1010");
}
```

### 出力
```
```


## 参照
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
- [P3612R1 Harmonize proxy-reference operations (LWG 3638 and 4187)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3612r1.html)
    - C++26で、`const`修飾された`*this`に対する`bool`からの代入演算子と、ADLで見つかる非メンバ`swap`関数が追加された

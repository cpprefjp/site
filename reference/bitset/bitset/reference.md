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
      CONSTEXPR bool operator~() const noexcept;
      CONSTEXPR operator bool() const noexcept;
      CONSTEXPR reference& flip() noexcept;
    };
  };
}
```
* CONSTEXPR[italic]

## 概要
`bitset::reference`は、`bitset`の各ビットにアクセスするためのプロキシクラスである。`bitset::`[`operator[]`](op_at.md)で返されるビット情報を取得、書き換えるためにある。

C++23から`bitset::reference`全メンバ関数への`constexpr`指定が行われる。


### メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------|----------------------------------------------------------|-------|
| `operator=(bool x)`           | ビット情報を書き換える   | |
| `operator=(const reference&)` | ビット情報をコピーする   | |
| `operator~()`                 | 反転したビットを取得する | |
| `operator bool()`             | `bool`型に変換する       | |
| `flip()`                      | ビットを反転させる       | |


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

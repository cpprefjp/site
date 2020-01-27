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
      reference() noexcept;
    public:
      ~reference() noexcept;
      reference& operator=(bool x) noexcept;
      reference& operator=(const reference&) noexcept;
      bool operator~() const noexcept;
      operator bool() const noexcept;
      reference& flip() noexcept;
    };
  };
}
```

## 概要
`bitset::reference`は、`bitset`の各ビットにアクセスするためのプ��シクラスである。`bitset::`[`operator[]`](op_at.md)で返されるビット情報を取得、書き換えるためにある。


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

### 参照


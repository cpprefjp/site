# none
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bool none() const;                    // (1) C++03
bool none() const noexcept;           // (1) C++11
constexpr bool none() const noexcept; // (1) C++23
```

## 概要
全てのビットが0になっているかを判定する。


## 戻り値
全てのビットが0になっていれば`true`、そうでなければ`false`を返す。  
この関数は、以下のプログラムと同じ動作をする：

```cpp
return count() == 0;
```
* count[link count.md]


## 例
```cpp example
#include <cassert>
#include <bitset>

int main()
{
  {
    std::bitset<4> bs("0000");

    bool result = bs.none();
    assert(result);
  }
  {
    std::bitset<4> bs("0010");

    bool result = bs.none();
    assert(!result);
  }
}
```

### 出力
```
```


## 参照
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)

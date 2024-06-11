# all
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool all() const noexcept;           // (1) C++11
constexpr bool all() const noexcept; // (1) C++23
```

## 概要
全てのビットが1になっているかを判定する。


## 戻り値
全てのビットが1になっていれば`true`、そうでなければ`false`を返す。  
この関数は、以下のプログラムと同じ動作をする：

```cpp
return count() == size();
```
* count[link count.md]
* size[link size.md]


## 例
```cpp example
#include <cassert>
#include <bitset>

int main()
{
  {
    std::bitset<4> bs("1111");

    bool result = bs.all();
    assert(result);
  }
  {
    std::bitset<4> bs("0010");

    bool result = bs.all();
    assert(!result);
  }
}
```

### 出力
```
```


## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)

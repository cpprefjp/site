#any
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bool any() const;          // C++03
bool any() const noexcept; // C++11
```

##概要
いずれかのビットが1になっているかを判定する。


##戻り値
いずれかのビットが1になっていれば`true`、そうでなければ`false`を返す。  
この関数は、以下のプログラムと同じ動作をする：

```cpp
return count() != 0;
```
* count[link count.md]


##例
```cpp
#include <cassert>
#include <bitset>

int main()
{
  {
    std::bitset<4> bs("1011");

    bool result = bs.any();
    assert(result);
  }
  {
    std::bitset<4> bs("0000");

    bool result = bs.any();
    assert(!result);
  }
}
```

###出力
```
```

##参照


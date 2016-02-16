#none
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bool none() const noexcept;
```

##概要
全てのビットが0になっているかを判定する。


##戻り値
全てのビットが0になっていれば`true`、そうでなければ`false`を返す。  
この関数は、以下のプログラムと同じ動作をする：

```cpp
return count() == 0;
```
* count[link count.md]


##例
```cpp
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
* assert[link /reference/cassert/assert.md]

###出力
```
```

##参照


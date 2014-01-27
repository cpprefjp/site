#any
```cpp
bool any() const;          // C++03
bool any() const noexcept; // C++11
```

##概要
いずれかのビットがONになっているかを判定する。


##戻り値
いずれかのビットがONになっていれば`true`、そうでなければ`false`を返す。  
この関数は、以下のプログラムと同じ動作をする：

```cpp
return count() != 0;
```
* count[link ./count.md]


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


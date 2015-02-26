#count
* bitset[meta header]

```cpp
size_t count() const;          // C++03
size_t count() const noexcept; // C++11
```

##概要
1になっているビットの数を取得する。


##戻り値
1になっているビットの数を返す。


##例
```cpp
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs("1011");

  std::cout << bs.count() << std::endl;
}
```

###出力
```
3
```


##参照


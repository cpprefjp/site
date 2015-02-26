#all (C++11)
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bool all() const noexcept;
```

##概要
全てのビットが1になっているかを判定する。


##戻り値
全てのビットが1になっていれば`true`、そうでなければ`false`を返す。  
この関数は、以下のプログラムと同じ動作をする：

```cpp
return count() == size();
```
* count[link ./count.md]
* size[link ./size.md]


##例
```cpp
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

###出力
```
```


##バージョン
###言語
- C++11


###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): ??


##参照


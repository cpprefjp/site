#test
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bool test(size_t pos) const;
```

##概要
任意の位置のビットが1になっているかを判定する。


##要件
`pos <` [`size()`](size.md)であること。


##戻り値
`pos`番目のビットが1になっていれば`true`、そうでなければ`false`を返す。


##例外
`pos >=` [`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。


##例
```cpp
#include <cassert>
#include <bitset>

int main()
{
  std::bitset<4> bs("1010");

  bool result1 = bs.test(1);
  assert(result1);

  bool result2 = bs.test(3);
  assert(result2);
}
```
* assert[link /reference/cassert/assert.md]

###出力
```
```

##参照


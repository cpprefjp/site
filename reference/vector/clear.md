#clear
```cpp
void clear();
```

##効果
全ての要素を削除する。

また、要素を指す全ての参照、ポインタ、イテレータが無効になる。past-the-end イテレータも無効になることがある。


##戻り値
なし


##事後条件
[`empty()`](./empty.md)` == true`


##計算量
線形時間。全ての要素に対してデストラクタを呼び出す。


##例
```cpp
#include <iostream>
#include <cassert>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3};

  v.clear();

  assert(v.empty());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* clear[color ff0000]

###出力
```
```


##参照
- [LWG Issue 2231. DR 704 removes complexity guarantee for `clear()`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2231)
    - C++03までこの関数の効果は`erase(begin(), end())`だったため、それによって線形時間の計算量が保証されていたが、C++11で効果の表記が変わったために、保証がなくなってしまっていた。C++14であらためて保証を追加。


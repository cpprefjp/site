#make_pair
```cpp
namespace std {

  template <class T1, class T2>
  pair<V1, V2> make_pair(T1&& x, T2&& y);

}
```
* pair[link /reference/utility/pair.md]

##概要

<b>pairクラスのオブジェクトを構築する。</b>
<b></b>
<b>C++03の場合、結果型のV1およびV2は以下のような型となる：</b>
<b>V1 : T1</b>
<b>V2 : T2</b>
<b></b>
<b>C++11以降の場合、</b><b>結果型のV1およびV2は以下のような型となる：</b>
<b>T1とT2それぞれの型Tにおいて、</b>

- <b>decay<T>::typeの結果型を使用し、</b>
- <b>かつTがreference_wrapper型であった場合T&型を使用する</b>


##戻り値

[`pair`](/reference/utility/pair.md)<V1, V2>([forward](/reference/utility/forward.md)<T1>(x), [forward](/reference/utility/forward.md)<T2>(y))

##備考



##例

```cpp
#include <iostream>
#include <utility>
#include <functional>

int main()
{
  std::pair<int, char> p1 = std::make_pair(1, 'a');

  int ar[3] = {1, 2, 3};
  char c = 'b';

  // 配列はT*となり、reference_wrapper<T>はT&となる。
  std::pair<int*, char&> p2 = std::make_pair(ar, std::ref(c));
}
```
* make_pair[color ff0000]
* make_pair[color ff0000]

###出力

```cpp
```

##参照
```
```cpp
istream_iterator<T, CharT, Traits, Distance>& operator++();

istream_iterator<T, CharT, Traits, Distance> operator++(int);
```

##概要

<b>イテレータを進める。</b>
<b>入力ストリームからoperator>>でデータを読み取る。</b>


##効果

前置operator++

`*in_stream » value;``return *this;`

後置operator++

`istream_iterator<T, CharT, Traits, Distance> tmp = *this;`
`*in_stream » value;``return tmp;`

``
※`in_stream`は、メンバ変数として保持している入力ストリームオブジェクトへのポインタ

##例

```cpp
#include <iostream>
#include <iterator>
#include <sstream>

int main()
{
  std::stringstream ss;
  ss << 1 << std::endl
     << 2 << std::endl
     << 3;

  std::istream_iterator<int> it(ss);
  std::istream_iterator<int> last;

  for (; it != last; ++it) {
    int result = *it;
    std::cout << result << std::endl;
  }
}
```
* ++it[color ff0000]

###出力

```cpp
1
2
3
```

##参照



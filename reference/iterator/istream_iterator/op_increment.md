# operator++
* iterator[meta header]
* std[meta namespace]
* istream_iterator[meta class]
* function[meta id-type]

```cpp
istream_iterator<T, CharT, Traits, Distance>& operator++();
istream_iterator<T, CharT, Traits, Distance> operator++(int);
```

## 概要
イテレータを進める。
入力ストリームから`operator>>`でデータを読み取る。


## 効果
前置`operator++`：
`*in_stream ≫ value;`
`return *this;`

後置`operator++`：
`istream_iterator<T, CharT, Traits, Distance> tmp = *this;`
`*in_stream ≫ value;`
`return tmp;`

※`in_stream`は、メンバ変数として保持している入力ストリームオブジェクトへのポインタ

## 例
```cpp example
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
* std::stringstream[link /reference/sstream/basic_stringstream.md.nolink]

### 出力
```
1
2
3
```

## 参照



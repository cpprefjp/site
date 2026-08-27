# operator++
* iterator[meta header]
* std[meta namespace]
* istream_iterator[meta class]
* function[meta id-type]

```cpp
istream_iterator<T, CharT, Traits, Distance>& operator++();   // (1) C++98
istream_iterator<T, CharT, Traits, Distance> operator++(int); // (2) C++98
```

## 概要
イテレータを進める。
入力ストリームから`operator>>`でデータを読み取る。


## 事前条件
`*this`が終端イテレータではないこと（保持している入力ストリームへのポインタがヌルポインタではないこと）。この条件を満たさない場合、動作は未定義である。


## 効果
前置`operator++`：
`*in_stream >> value;`
`return *this;`

後置`operator++`：
`istream_iterator<T, CharT, Traits, Distance> tmp = *this;`
`*in_stream >> value;`
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
* std::stringstream[link /reference/sstream/basic_stringstream.md]

### 出力
```
1
2
3
```

## 参照
- [LWG Issue 838. Can an end-of-stream iterator become a non-end-of-stream one?](https://cplusplus.github.io/LWG/issue838)
    - C++11で、終端イテレータに対してこの演算子を呼び出したときの動作は未定義であることが明記された。終端イテレータが再び非終端イテレータに戻ることはない

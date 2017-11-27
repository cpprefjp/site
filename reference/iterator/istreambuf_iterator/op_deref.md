# operator*
* iterator[meta header]
* std[meta namespace]
* istreambuf_iterator[meta class]
* function[meta id-type]

```cpp
CharT operator*() const
```

## 概要
イテレータを間接参照する。


## 戻り値
`sbuf_->sgetc()`で文字を読み込んで返す。

※`sbuf_`はメンバ変数として保持している`streambuf_type`オブジェクトへのポインタ


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <sstream>

int main()
{
  std::stringstream ss;
  ss << "123";

  std::istreambuf_iterator<char> it(ss);
  std::cout << *it << std::endl;
}
```
* std::stringstream[link /reference/sstream/basic_stringstream.md.nolink]

### 出力
```
1
```

## 参照



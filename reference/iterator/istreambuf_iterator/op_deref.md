#operator*
```cpp
CharT operator*() const
```

##概要

<b>イテレータを間接参照する。</b>


##戻り値

`sbuf_->sgetc()`で文字を読み込んで返す。

※`sbuf_`はメンバ変数として保持している`streambuf_type`オブジェクトへのポインタ


##例

```cpp
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
* *it[color ff0000]

###出力

```cpp
1
```

##参照



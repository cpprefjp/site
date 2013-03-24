#operator*
```cpp
const T& operator*() const;
```

##概要

<b>イテレータを間接参照する。</b>
<b>読み込み済みの値を返す。</b>


##戻り値

`operator++()`で入力ストリームから読み込まれ、メンバ変数として保持されている値を返す。


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

  std::istream_iterator<int> it(ss); // 入力ストリームオブジェクトへの参照を渡す
  std::istream_iterator<int> last;   // デフォルト構築。終端値として使用する

  for (; it != last; ++it) {
    int result = *it;
    std::cout << result << std::endl;
  }
}
```
* *it[color ff0000]

###出力

```cpp
1
2
3
```

##参照



```cpp
ostreambuf_iterator(ostream_type& s) noexcept;
ostreambuf_iterator(streambuf_type* s) noexcept;
```

##ostreambuf_iteratorオブジェクトの構築

- <b>ostreambuf_iterator(ostreamtype& s) noexcept</b>
- <b>s.rdbuf()をメンバ変数として保持する。</b>
- <b>ostreambuf_iterator(streambuf_type* s) noexceptsをメンバ変数として保持する</b>


##例

```cpp
#include <iostream>
#include <iterator>
#include <algorithm> // copy
#include <string>

int main()
{
  const std::string s = "Hello";

  // ストリームの参照から構築
  std::ostreambuf_iterator<char> it1(std::cout);

  // streambuf*から構築
  std::ostreambuf_iterator<char> it2(std::cout.rdbuf());

  std::copy(s.begin(), s.end(), it1);
  std::copy(s.begin(), s.end(), it2);
}
```

###出力

```cpp
HelloHello
```

##参照



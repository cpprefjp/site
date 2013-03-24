#コンストラクタ
```cpp
constexpr istreambuf_iterator() noexcept;
istreambuf_iterator(const istreambuf_iterator&) noexcept = default;
istreambuf_iterator(istream_type& s) noexcept;
istreambuf_iterator(streambuf_type* s) noexcept;
istreambuf_iterator(const proxy& p) noexcept;
```

##istreambuf_iteratorオブジェクトの構築

- <b>istreambuf_iterator()デフォルトコンストラクタメンバ変数として保持するstreambufオブジェクトへのポインタをヌル初期化する。</b>
- <b>istreambuf_iterator(istreamtype& s) noexcepts.rdbuf()をメンバ変数として保持する。</b>
- <b>istreambuf_iterator(streambuf_type* s) noexceptsをメンバ変数として保持する</b>
- <b>istreambuf_iterator(const proxy& p) noexcept後置operator++が返すであろうproxyオブジェクトを受け取り、そのオブジェクトが指すstreambufオブジェクトへのポインタをメンバ変数として保持する</b>


##例

```cpp
#include <iostream>
#include <iterator>
#include <sstream>

int main()
{
  std::stringstream ss;
  ss << "123";

  // ストリームの参照から構築
  std::istreambuf_iterator<char> it1(ss);

  // streambuf*から構築
  std::istreambuf_iterator<char> it2(ss.rdbuf());

  std::cout << *it1 << std::endl;
  std::cout << *it2 << std::endl;
}
```

###出力

```cpp
1
1
```

##参照



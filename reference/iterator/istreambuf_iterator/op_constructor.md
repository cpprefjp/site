# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* istreambuf_iterator[meta class]
* function[meta id-type]

```cpp
constexpr istreambuf_iterator() noexcept;
istreambuf_iterator(const istreambuf_iterator&) noexcept = default;
istreambuf_iterator(istream_type& s) noexcept;
istreambuf_iterator(streambuf_type* s) noexcept;
istreambuf_iterator(const proxy& p) noexcept;
```

## istreambuf_iteratorオブジェクトの構築
- `istreambuf_iterator()`<br/>デフォルトコンストラクタメンバ変数として保持する`streambuf`オブジェクトへのポインタをヌル初期化する。
- `istreambuf_iterator(istreamtype& s) noexcept`<br/>`s.rdbuf()`をメンバ変数として保持する。
- `istreambuf_iterator(streambuf_type* s) noexcept`<br/>`s`をメンバ変数として保持する
- `istreambuf_iterator(const proxy& p) noexcept`<br/>後置`operator++()`が返すであろうproxyオブジェクトを受け取り、そのオブジェクトが指す`streambuf`オブジェクトへのポインタをメンバ変数として保持する。


## 例
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
* std::stringstream[link /reference/sstream/basic_stringstream.md.nolink]

### 出力
```
1
1
```

## 参照



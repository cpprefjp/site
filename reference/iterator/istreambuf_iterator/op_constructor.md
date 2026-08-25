# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* istreambuf_iterator[meta class]
* function[meta id-type]

```cpp
istreambuf_iterator() throw();            // (1) C++98
constexpr istreambuf_iterator() noexcept; // (1) C++11

constexpr istreambuf_iterator(default_sentinel_t) noexcept; // (2) C++20

istreambuf_iterator(const istreambuf_iterator&) noexcept = default; // (3) C++11

istreambuf_iterator(istream_type& s) throw();  // (4) C++98
istreambuf_iterator(istream_type& s) noexcept; // (4) C++11

istreambuf_iterator(streambuf_type* s) throw();  // (5) C++98
istreambuf_iterator(streambuf_type* s) noexcept; // (5) C++11

istreambuf_iterator(const proxy& p) throw();  // (6) C++98
istreambuf_iterator(const proxy& p) noexcept; // (6) C++11
```

## istreambuf_iteratorオブジェクトの構築
- (1) : デフォルトコンストラクタ。メンバ変数として保持する`streambuf`オブジェクトへのポインタをヌル初期化する。
- (2) : [`default_sentinel`](/reference/iterator/default_sentinel_t.md)を受け取り、(1)と同等の構築をより明示的に行う。
- (3) : コピーコンストラクタ。
- (4) : `s.rdbuf()`をメンバ変数として保持する。
- (5) : `s`をメンバ変数として保持する。`s`がヌルポインタである場合、終端イテレータが構築される。
- (6) : 後置`operator++()`が返すであろうproxyオブジェクトを受け取り、そのオブジェクトが指す`streambuf`オブジェクトへのポインタをメンバ変数として保持する。


## 例
```cpp example
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
* std::stringstream[link /reference/sstream/basic_stringstream.md]

### 出力
```
1
1
```

## 参照
- [LWG Issue 2544. `istreambuf_iterator(basic_streambuf<charT, traits>* s)` effects unclear when `s` is `0`](https://cplusplus.github.io/LWG/issue2544)
    - (5)に`s`がヌルポインタの場合は終端イテレータが構築されることが明確化された
    - この修正は欠陥報告(DR)であり、C++98に遡及して適用される。クラスの導入部で既に規定されていた内容を各コンストラクタの効果として明記しただけであり、処理系の挙動は変わらないため

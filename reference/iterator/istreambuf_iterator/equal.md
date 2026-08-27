# equal
* iterator[meta header]
* std[meta namespace]
* istreambuf_iterator[meta class]
* function[meta id-type]

```cpp
bool equal(istreambuf_iterator& b) const;       // (1) C++98
bool equal(const istreambuf_iterator& b) const; // (1) C++11
```

## 概要
他の`istreambuf_iterator`オブジェクトと等値比較する


## 戻り値
双方がストリームの終端に達していた場合(デフォルト構築した状態は終端とみなせる)、もしくは同じ位置を指していた場合は`true`を返し、そうでなければ`false`を返す。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <sstream>

int main()
{
  std::stringstream ss;
  ss << "123";

  std::istreambuf_iterator<char> it1(ss);
  std::istreambuf_iterator<char> it2 = it1;
  std::istreambuf_iterator<char> last;

  if (it1.equal(it2)) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }

  ++it1;
  ++it1;
  ++it1;
  if (it1.equal(last)) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* equal[color ff0000]
* std::stringstream[link /reference/sstream/basic_stringstream.md]

### 出力
```
equal
equal
```

## 参照
- [LWG Issue 1126. `istreambuff_iterator::equal` needs a const & parameter](https://cplusplus.github.io/LWG/issue1126)
    - C++11で、引数の型が`istreambuf_iterator&`から`const istreambuf_iterator&`へ改められた。一時オブジェクトを渡せるようにするため

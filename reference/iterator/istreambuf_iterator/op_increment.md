# operator++
* iterator[meta header]
* std[meta namespace]
* istreambuf_iterator[meta class]
* function[meta id-type]

```cpp
istreambuf_iterator<CharT, Traits>& operator++();
proxy operator++(int);
```
* proxy[italic]

## 概要
イテレータを進める


## 効果
前置インクリメント：
`sbuf_->sbumpc();`
`return *this;`

後置インクリメント：
`sbuf->sbumpc()`を行い、前の状態を`proxy`オブジェクトとして返す。
`proxy`クラスは実装定義。

※`sbuf_`は、メンバ変数として保持している`streambuf_type`オブジェクトへのポインタ


## 例
```cpp
#include <iostream>
#include <iterator>
#include <sstream>

int main()
{
  std::stringstream ss;
  ss << "123";

  std::istreambuf_iterator<char> it(ss);

  ++it; // 前置インクリメント
  std::cout << *it << std::endl;
  std::cout << *(it++) << std::endl; // 後置インクリメント
  std::cout << *it << std::endl;
}
```
* ++it[color ff0000]
* it++[color ff0000]
* std::stringstream[link /reference/sstream/basic_stringstream.md]

### 出力
```
2
2
3
```

## 参照



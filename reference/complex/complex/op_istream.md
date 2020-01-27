# operator>>
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T, class CharT, class Traits>
  std::basic_istream<CharT, Traits>&
    operator>>(std::basic_istream<CharT, Traits>& is, complex<T>& x);
}
```

## 概要
ストリームからの入力。


## 要件
入力の値が`T`に変換可能であること。


## 効果
以下のいずれかの形式の`complex`オブジェクトを�み込む：

- `u`
- `(u)`
- `(u, v)`

`u`は実部の値、`v`は虚部の値である。

�み込みに失敗した場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base`](/reference/ios/ios_base.md)`::failbit)`が呼び出される。


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <complex>

int main()
{
  std::stringstream ss("(1.0,2.0)");

  std::complex<double> c;
  ss >> c;

  std::cout << c << std::endl;
}
```
* >>[color ff0000]

### 出力
```
(1,2)
```


## 関連項目

| 名前                          | 説明               |
|-------------------------------|--------------------|
| [`operator<<`](op_ostream.md) | ストリームへの出力 |


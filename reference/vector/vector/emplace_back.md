# emplace_back
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
void emplace_back(Args&&... args);                      // (1) C++11
template <class... Args>
reference emplace_back(Args&&... args);                 // (1) C++17
template <class... Args>
constexpr reference emplace_back(Args&&... args);       // (1) C++20

template <class... Args>
void vector<bool>::emplace_back(Args&&... args);                // (2) C++11
template <class... Args>
reference vector<bool>::emplace_back(Args&&... args);           // (2) C++17
template <class... Args>
constexpr reference vector<bool>::emplace_back(Args&&... args); // (2) C++20
```

## 概要
直接構築で新たな要素を末尾に追加する。

この関数の引数 `args...` は、要素型 `value_type` のコンストラクタ引数である。当関数の内部で要素型 `value_type` のコンストラクタを呼び出し、追加する要素を構築する。


## 戻り値
- C++14 まで：なし
- C++17 から：構築した要素への参照


## 計算量
償却定数時間。

この関数を呼び出す前に[`size()`](size.md) `<` [`capacity()`](capacity.md)であった場合、この関数の実行は定数時間で行われる。そうでない場合は、メモリ領域の再確保と、その領域への要素のコピーもしくはムーブが行われるため、線形時間で実行される。

`vector`の実装で行われるメモリ確保戦略では、再確保の際にそれら要素がぴったり収まるサイズを確保するのではなく、少し多めの1.5倍や2倍といったサイズのメモリを確保し、再確保の回数を減らしている。事前に追加する要素の数がわかっている場合には[`reserve()`](reserve.md)メンバ関数で事前にその要素数分のメモリを確保し、そうでない場合には`vector`のメモリ確保戦略に任せるのがよいだろう。


## 備考
- 再確保の可能性、イテレータの有効性への影響、例外発生時に副作用が発生しない保証はいずれも[`push_back()`](push_back.md)と同様。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <utility>
#include <string>
#include <algorithm>

int main()
{
  std::vector<std::pair<int, std::string>> v;

  v.emplace_back(3, std::string("hello"));
  v.push_back(std::make_pair(1, std::string("world")));

  std::for_each(v.begin(), v.end(), [](decltype(v)::const_reference x) {
    std::cout << x.first << ',' << x.second << std::endl;
  });
}
```
* emplace_back[color ff0000]
* v.push_back[link push_back.md]

### 出力
```
3,hello
1,world
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2013 [mark verified]


## 参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)
- [LWG Issue 2187. `vector<bool>` is missing emplace and `emplace_back` member functions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2187)
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
    - 経緯の説明は、[`vector::push_back()`](/reference/vector/vector/push_back.md)ページを参照。
- [P0084R0 Emplace Return Type](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0084r0.pdf)
- [P0084R1 Emplace Return Type (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0084r1.pdf)
- [P0084R2 Emplace Return Type (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0084r2.pdf)
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)

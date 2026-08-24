# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* istream_iterator[meta class]
* function[meta id-type]

```cpp
istream_iterator();                                    // (1) C++03
constexpr istream_iterator();                          // (1) C++11

constexpr istream_iterator(default_sentinel_t);        // (2) C++20

istream_iterator(istream_type& s);                     // (3)

istream_iterator(const istream_iterator& x);           // (4) C++03
istream_iterator(const istream_iterator& x) = default; // (4) C++11
constexpr istream_iterator(const istream_iterator& x)
  noexcept(see below);                                 // (4) C++23
```
* see below[italic]

## 概要
- (1) : デフォルトコンストラクタ。メンバ変数として保持する入力ストリームへのポインタをヌル初期化する。デフォルトコンストラクタで構築された`istream_iterator`オブジェクトは、イテレータの終端値として使用できる。
- (2) : [`default_sentinel`](/reference/iterator/default_sentinel_t.md)を受け取り、(1)と同等の構築をより明示的に行う。
- (3) : 入力ストリームオブジェクトへの参照を受け取り、メンバ変数にそのオブジェクトへのポインタを保持する。`operator*()`で現在参照している値を返すために、この段階で入力ストリームから値を読み取り、メンバ変数に値を保持する。
- (4) : コピーコンストラクタ


## 例外
- (4) :
    - C++23 : `noexcept(see below)`の例外指定は、[`is_nothrow_copy_constructible_v`](/reference/type_traits/is_nothrow_copy_constructible.md)`<T>`と等価である。


## 備考
- (4) : C++23では、メンバ変数（入力ストリームへのポインタと保持値）をコピー初期化する明示的な定義に変更された。値型`T`がトリビアルにコピー構築可能であってもコピーコンストラクタはトリビアルにならない（ABI互換性のための変更）。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <sstream>
#include <algorithm>

int main()
{
  std::stringstream ss;
  ss << 1 << std::endl
     << 2 << std::endl
     << 3;

  std::istream_iterator<int> it(ss); // 入力ストリームオブジェクトへの参照を渡す
  std::istream_iterator<int> last;   // デフォルト構築。終端値として使用する

  std::for_each(it, last, [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::stringstream[link /reference/sstream/basic_stringstream.md]

### 出力
```
1
2
3
```

## 参照
- [LWG Issue 2576. `istream_iterator` and `ostream_iterator` should use `std::addressof`](https://wg21.cmeerw.net/lwg/issue2576)
- [LWG Issue 2804. Unconditional `constexpr` default constructor for `istream_iterator`](https://cplusplus.github.io/LWG/issue2804)
    - デフォルトコンストラクタ(1)の宣言に書かれていた`see below`というプレースホルダが`constexpr`と綴り直された（`T`がトリビアルにデフォルト構築可能な場合に`constexpr`コンストラクタとなるという条件は、C++17時点でも効果として残っている）
    - この修正は欠陥報告(DR)であり、C++11に遡及して適用される。宣言の書き方を直す編集上の修正であり、処理系は当初から`constexpr`と宣言していたため
- [LWG Issue 3600. Making `istream_iterator` copy constructor trivial is an ABI break](https://cplusplus.github.io/LWG/issue3600)
    - C++23で、コピーコンストラクタが`= default`から明示的に定義された非トリビアルなコンストラクタ（`constexpr`・`noexcept`指定付き）に変更された。既存実装とのABI互換性を保つため、トリビアル化が見送られた

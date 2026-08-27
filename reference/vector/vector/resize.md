# resize
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
void resize(size_type sz);                       // (1) C++11
constexpr void resize(size_type sz);             // (1) C++20

void resize(size_type sz, const T& c);           // (2) C++11
constexpr void resize(size_type sz, const T& c); // (2) C++20

void resize(size_type sz, T c = T()); // (1) + (2) C++98
```

## 要件
要素数を変更する


## 要件
- (1) :
    - 型`T`がデフォルト構築可能であること (C++14)
    - 型`T`が`*this`に対してコピー挿入可能であること (C++11まで)
    - 型`T`が`*this`に対してムーブ挿入可能であること (C++14)

- (2) :
    - 型`T`が`*this`に対してコピー挿入可能であること (C++14)


## 効果
- (1) :
    - もし`sz`が現在のコンテナの[`size()`](size.md)より小さい場合、以下の動作をする：
        - C++11まで : [`erase`](erase.md)`(`[`begin()`](begin.md) `+ sz,` [`end()`](end.md)`);`
        - C++14 : [`pop_back()`](pop_back.md)関数を[`size()`](size.md) `- sz`回呼ぶ
        - C++17以降 : 後ろから[`size()`](size.md) `- sz`個の要素を削除する
    - そうでない場合、`sz -` [`size()`](size.md)個だけ値初期化された`T`型オブジェクトのコピーを追加する。
    - `sz ==` [`size()`](size.md)である場合、追加される要素は`0`個であり、コンテナは変更されない。


- (2) :
    - C++11まで

        ```cpp
        if (sz > size())
          insert(end(), sz - size(), c);
        else if (sz < size())
          erase(begin() + sz, end());
        ```
        * size()[link size.md]
        * insert[link insert.md]
        * end()[link end.md]
        * erase[link erase.md]
        * begin()[link begin.md]

    - C++14
        - もし`sz`が現在のコンテナの[`size()`](size.md)より小さい場合、[`pop_back()`](pop_back.md)関数を[`size()`](size.md) `- sz`回呼ぶ
        - もし`sz`が現在のコンテナの[`size()`](size.md)より大きい場合、`sz -` [`size()`](size.md)個だけオブジェクト`c`のコピーを追加する。

    - C++17以降
        - もし`sz`が現在のコンテナの[`size()`](size.md)より小さい場合、後ろから[`size()`](size.md) `- sz`個の要素を削除する
        - そうでなければ、`sz -` [`size()`](size.md)個だけオブジェクト`c`のコピーを追加する。


## 戻り値
なし


## 備考
- (2) : コピー挿入可能でない型`T`のムーブコンストラクタによる例外を除き、例外が送出された場合この関数は何もしない。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  // 増加
  {
    std::vector<int> v = {3, 1, 4};
    v.resize(5);

    std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << std::endl; });
  }
  std::cout << std::endl;

  // 減少
  {
    std::vector<int> v = {3, 1, 4};
    v.resize(1);

    std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << std::endl; });
  }
}
```
* resize[color ff0000]

### 出力
```
3
1
4
0
0

3
```


## 参照
- [LWG Issue 868. Default construction and value-initialization](https://cplusplus.github.io/LWG/issue868)
    - C++11の策定時に、値を指定しない`resize(sz)`の要素追加が「デフォルト構築」から「値初期化」へ改められた。ドラフト段階の文言では組み込み型の要素が未初期化になりうるものだったため（値を指定するC++98の`resize(sz, T())`とは挙動は変わらない）
- [LWG Issue 1525. Effects of `resize(size())` on a `vector`](https://cplusplus.github.io/LWG/issue1525)
    - C++11で、効果の条件が`sz <= size()`へ修正された。C++11のドラフトでは`sz < size()`と`size() < sz`のみが規定されており、`sz == size()`の場合の効果が規定されていなかったため（C++98では`else ; // do nothing`と明記されていた）。なお現在の規格では、`sz < size()`でない場合に`sz - size()`個（`sz == size()`なら`0`個）を追加すると規定されており、どの版でも`sz == size()`ならコンテナは変更されない
- [LWG Issue 2033. Preconditions of `reserve`, `shrink_to_fit`, and `resize` functions](https://wg21.cmeerw.net/lwg/issue2033)
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
- [LWG Issue 2160. Unintended destruction ordering-specification of `resize`](https://wg21.cmeerw.net/lwg/issue2160)
- [LWG Issue 2323. `vector::resize(n, t)`'s specification should be simplified](https://wg21.cmeerw.net/lwg/issue2323)

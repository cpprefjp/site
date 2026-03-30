# operator=
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr inplace_vector& operator=(const inplace_vector& other); // (1) C++26

constexpr inplace_vector& operator=(inplace_vector&& other)
  noexcept(N == 0 || (is_nothrow_move_assignable_v<T> &&
                      is_nothrow_move_constructible_v<T>));       // (2) C++26

constexpr inplace_vector& operator=(initializer_list<T> il);      // (3) C++26
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : コピー代入
- (2) : ムーブ代入
- (3) : 初期化子リストの代入


## 効果
- (1) : `other`の全ての要素を`*this`にコピーする。`*this`の既存の要素は破棄される。
- (2) : `other`の全ての要素を`*this`にムーブする。`*this`の既存の要素は破棄される。
- (3) : 初期化子リスト`il`の全ての要素を`*this`にコピーする。`*this`の既存の要素は破棄される。


## 例外
- (3) : `il`の要素数が`N`を超える場合、[`bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 戻り値
`*this`


## 計算量
- (1) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間
- (2) : 全要素のデストラクタ呼び出しとムーブを行うために、線形時間
- (3) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間


## 例
```cpp example
#include <cassert>
#include <inplace_vector>
#include <utility>

int main()
{
  // コピー代入
  {
    std::inplace_vector<int, 5> v1 = {1, 2, 3};
    std::inplace_vector<int, 5> v2;
    v2 = v1;
    assert(v1 == v2);
  }

  // ムーブ代入
  {
    std::inplace_vector<int, 5> v1 = {1, 2, 3};
    std::inplace_vector<int, 5> v2;
    auto v1_copy = v1;
    v2 = std::move(v1);
    assert(v2 == v1_copy);
  }

  // 初期化子リストからのコピー代入
  {
    std::inplace_vector<int, 5> iv;
    iv = {1, 2, 3};
    assert(iv.size() == 3);
  }
}
```
* std::move[link /reference/utility/move.md]
* iv.size()[link size.md]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]

## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)

# コンストラクタ
* tuple[meta header]
* std[meta namespace]
* tuple[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
constexpr tuple();                         // (1) C++11
explicit tuple(const Types&...);           // (2) C++11
constexpr explicit tuple(const Types&...); // (2) C++14

template <class... UTypes>
explicit tuple(UTypes&&...);               // (3) C++11

template <class... UTypes>
constexpr explicit tuple(UTypes&&...);     // (3) C++14

tuple(const tuple&) = default;             // (4) C++11
tuple(tuple&&) = default;                  // (5) C++11

template <class... UTypes>
tuple(const tuple<UTypes...>&);            // (6) C++11

template <class... UTypes>
constexpr tuple(const tuple<UTypes...>&);  // (6) C++14

template <class... UTypes>
tuple(tuple<UTypes...>&&);                 // (7) C++11

template <class... UTypes>
constexpr tuple(tuple<UTypes...>&&);       // (7) C++14

template <class U1, class U2>
tuple(const pair<U1, U2>&);                // (8) C++11

template <class U1, class U2>
constexpr tuple(const pair<U1, U2>&);      // (8) C++14

template <class U1, class U2>
tuple(pair<U1, U2>&&);                     // (9) C++11

template <class U1, class U2>
constexpr tuple(pair<U1, U2>&&);           // (9) C++14

// アロケータによる構築
template <class Alloc>
tuple(allocator_arg_t, const Alloc& a);    // (10) C++11

template <class Alloc>
tuple(allocator_arg_t, const Alloc& a,
      const Types&...);                    // (11) C++11

template <class Alloc, class... UTypes>
tuple(allocator_arg_t, const Alloc& a,
      UTypes&&...);                        // (12) C++11

template <class Alloc>
tuple(allocator_arg_t, const Alloc& a,
      const tuple&);                       // (13) C++11

template <class Alloc>
tuple(allocator_arg_t, const Alloc& a,
      tuple&&);                            // (14) C++11

template <class Alloc, class... UTypes>
tuple(allocator_arg_t, const Alloc& a,
      const tuple<UTypes...>&);            // (15) C++11

template <class Alloc, class... UTypes>
tuple(allocator_arg_t, const Alloc& a,
      tuple<UTypes...>&&);                 // (16) C++11

template <class Alloc, class U1, class U2>
tuple(allocator_arg_t, const Alloc& a,
      const pair<U1, U2>&);                // (17) C++11

template <class Alloc, class U1, class U2>
tuple(allocator_arg_t, const Alloc& a,
     pair<U1, U2>&&);                      // (18) C++11
```
* pair[link /reference/utility/pair.md]
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]

## tupleオブジェクトの構築
- (1) : すべての要素を初期化して構築
- (2) : 可変テンプレートパラメータの型の値によるコピー構築
- (3) : 可変テンプレートパラメータの型に変換可能な値によるムーブ構築
- (4) : コピーコンストラクタ
- (5) : ムーブコンストラクタ
- (6) : 変換可能な型からのコピーコンストラクタ
- (7) : 変換可能な型からのムーブコンストラクタ
- (8) : テンプレートパラメータ数が2の場合に、`std::pair`オブジェクトからコピー構築する
- (9) : テンプレートパラメータ数が2の場合に、`std::pair`オブジェクトからムーブ構築する
- (10) : アロケータを指定してデフォルト構築する
- (11) : アロケータを指定して可変テンプレートパラメータの型の値によってコピー構築する
- (12) : アロケータを指定して可変テンプレートパラメータの型の値によってムーブ構築する
- (13) : アロケータを指定してコピー構築
- (14) : アロケータを指定してムーブ構築
- (15) : アロケータを指定して変換可能な他の`tuple`オブジェクトからコピー構築
- (16) : アロケータを指定して変換可能な他の`tuple`オブジェクトからムーブ構築
- (17) : テンプレートパラメータ数が2の場合、アロケータを指定して`std::pair`オブジェクトからコピー構築する
- (18) : テンプレートパラメータ数が2の場合、アロケータを指定して`std::pair`オブジェクトからムーブ構築する


## 例
```cpp example
#include <tuple>
#include <string>
#include <utility>

int main()
{
  // デフォルトコンストラクト
  std::tuple<int, char, std::string> t1;

  // コピーコンストラクト
  std::tuple<int, char, std::string> t2(t1);

  // ムーブコンストラクト
  std::tuple<int, char, std::string> t3(std::move(t2));

  // 値を指定して構築
  std::tuple<int, char, std::string> t4(1, 'a', "hello");

  // pairから構築(2要素の場合のみ)
  std::tuple<int, char> t5 = std::make_pair(1, 'a');

  // アロケータを指定して構築。
  // std::allocator_argを第1引数にすると、第2引数がアロケータと見なされ、
  // 第3引数以降がtupleの要素となる
  std::tuple<int, char, std::string> t6(std::allocator_arg,
                                        std::allocator<std::tuple<int, char, std::string>>(),
                                        1, 'a', "hello");
}
```
* std::move[link /reference/utility/move.md]
* std::allocator_arg[link /reference/memory/allocator_arg_t.md]
* std::allocator[link /reference/memory/allocator.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 


## 参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)



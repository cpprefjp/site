#コンストラクタ
```cpp
constexpr tuple();
explicit tuple(const Types&...);

template <class... UTypes>
  explicit tuple(UTypes&&...);

tuple(const tuple&) = default;
tuple(tuple&&) = default;

template <class... UTypes>
  tuple(const tuple<UTypes...>&);

template <class... UTypes>
  tuple(tuple<UTypes...>&&);

template <class U1, class U2>
  tuple(const pair<U1, U2>&);

template <class U1, class U2>
  tuple(pair<U1, U2>&&);

// アロケータによる構築
template <class Alloc>
  tuple(allocator_arg_t, const Alloc& a);

template <class Alloc>
  tuple(allocator_arg_t, const Alloc& a, const Types&...);

template <class Alloc, class... UTypes>
  tuple(allocator_arg_t, const Alloc& a, UTypes&&...);

template <class Alloc>
  tuple(allocator_arg_t, const Alloc& a, const tuple&);

template <class Alloc>
  tuple(allocator_arg_t, const Alloc& a, tuple&&);

template <class Alloc, class... UTypes>
  tuple(allocator_arg_t, const Alloc& a, const tuple<UTypes...>&);

template <class Alloc, class... UTypes>
  tuple(allocator_arg_t, const Alloc& a, tuple<UTypes...>&&);

template <class Alloc, class U1, class U2>
  tuple(allocator_arg_t, const Alloc& a, const pair<U1, U2>&);

template <class Alloc, class U1, class U2>

  tuple(allocator_arg_t, const Alloc& a, pair<U1, U2>&&);
```
* pair[link /reference/utility/pair.md]
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]

##tupleオブジェクトの構築
- `constexpr tuple()`

すべての要素を初期化して構築

- `explicit tuple(const Types&...)`

可変テンプレートパラメータの型の値によるコピー構築

- `template <class... UTypes>explicit tuple(UTypes&&...)`

可変テンプレートパラメータの型に変換可能な値によるムーブ構築

- `tuple(const tuple&) = default`

コピーコンストラクタ

- `tuple(tuple&&) = default`

ムーブコンストラクタ

- `template <class U1, class U2>tuple(const std::pair<U1, U2>&)`

テンプレートパラメータ数が2の場合に、`std::pair`オブジェクトからコピー構築する

- `template <class U1, class U2>tuple(std::pair<U1, U2>&&)`

テンプレートパラメータ数が2の場合に、`std::pair`オブジェクトからムーブ構築する

- `template <class Alloc>tuple(allocator_arg_t, const Alloc& a)`

アロケータを指定して構築する

- `template <class Alloc>tuple(allocator_arg_t, const Alloc& a, const Types&...)`

アロケータを指定して可変テンプレートパラメータの型の値によってコピー構築する

- `template <class Alloc, class... UTypes>`<br/>`tuple(allocator_arg_t, const Alloc& a, UTypes&&...)`

アロケータを指定して可変テンプレートパラメータの型の値によってムーブ構築する

- `template <class Alloc>`<br/>`tuple(allocator_arg_t, const Alloc& a, const tuple&)`

アロケータを指定してコピー構築

- `template <class Alloc>`<br/>`tuple(allocator_arg_t, const Alloc& a, tuple&&)`

アロケータを指定してムーブ構築

- `template <class Alloc, class... UTypes>`<br/>`tuple(allocator_arg_t, const Alloc& a, const tuple<UTypes...>&)`

アロケータを指定して変換可能な他の`tuple`オブジェクトからコピー構築

- `template <class Alloc, class... UTypes>`<br/>`tuple(allocator_arg_t, const Alloc& a, tuple<UTypes...>&&)`

アロケータを指定して変換可能な他の`tuple`オブジェクトからムーブ構築

- `template <class Alloc, class U1, class U2>`<br/>`tuple(allocator_arg_t, const Alloc& a, const pair<U1, U2>&)`

テンプレートパラメータ数が2の場合、アロケータを指定して`std::pair`オブジェクトからコピー構築する

- `template <class Alloc, class U1, class U2>`<br/>`tuple(allocator_arg_t, const Alloc& a, pair<U1, U2>&&)`

テンプレートパラメータ数が2の場合、アロケータを指定して`std::pair`からムーブ構築する


##例
```cpp
#include <tuple>
#include <string>
#include <utility> // std::move

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

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): 
- [Visual C++](/implementation#visual_cpp.md)


##参照



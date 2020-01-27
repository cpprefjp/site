# id
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class thread::id {
  public:
    id() noexcept;
  };

  bool operator==(thread::id x, thread::id y) noexcept;
  bool operator!=(thread::id x, thread::id y) noexcept;
  bool operator<(thread::id x, thread::id y) noexcept;
  bool operator<=(thread::id x, thread::id y) noexcept;
  bool operator>(thread::id x, thread::id y) noexcept;
  bool operator>=(thread::id x, thread::id y) noexcept;

  template<class CharT, class Traits>
  std::basic_ostream<CharT, Traits>& operator<<(std::basic_ostream<CharT, Traits>& out, thread::id id);

  template <class T> struct hash;
  template <> struct hash<thread::id>;
}
```
* hash[link /reference/functional/hash.md]

## 概要
スレッド�別�。trivially copyable class。

実行のスレッドに対して一意な`thread::id`が対応づけられる。デフォルトコンストラクトされた`thread::id`はいかなるスレッドとも対応付けられない（ポインタ型における`nullptr`のようなもの）。

終了したスレッドを表す�別�の値は、再利用される可能性がある。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------|------------------------------------------------------------------------|-------|
| `id() noexcept` | デフォルトコンストラクタ。いかなるスレッドも指さない�別�を生成する。 | C++11 |


## 比較演算�

| 名前 | 説明 | 対応バージョン |
|--------------|------------------------------------|-------|
| `operator==` | �値比較                           | C++11 |
| `operator!=` | 非�値比較                         | C++11 |
| `operator<`  | 左辺が右辺より小さいかの判定を行う | C++11 |
| `operator<=` | 左辺が右辺以下かの判定を行う       | C++11 |
| `operator>`  | 左辺が右辺より大きいかの判定を行う | C++11 |
| `operator>=` | 左辺が右辺以上かの判定を行う       | C++11 |

### ストリーム出力

| 名前 | 説明 | 対応バージョン |
|--------------|-----------------------------------------------------------------------------------------------------|-------|
| `operator<<` | `thread::id`のストリーム出力。 フォーマットは未規定だが、他の�別�と異なることがわかる表現となる。 | C++11 |


## hashサポート

| 名前 | 説明 | 対応バージョン |
|--------|-----------------------------------------|-------|
| `hash` | `thread::id`での特殊化 (class template) | C++11 |


## 例
```cpp example
#include <iostream>
#include <thread>

int main()
{
  const std::thread::id main_tid = std::this_thread::get_id();
  std::cout << "main=" << main_tid << std::endl;
  return 0;
}
```
* std::thread::id[color ff0000]
* std::this_thread::get_id()[link /reference/thread/this_thread/get_id.md]

### 出力例
```
main=824a30
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015

## 参照
- [LWG Issue 783. `thread::id` reuse](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#783)


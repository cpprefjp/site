# scheduler
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sch>
  concept scheduler =
    derived_from<typename remove_cvref_t<Sch>::scheduler_concept, scheduler_t> &&
    queryable<Sch> &&
    requires(Sch&& sch) {
      { schedule(std::forward<Sch>(sch)) } -> sender;
      { auto(get_completion_scheduler<set_value_t>(
          get_env(schedule(std::forward<Sch>(sch))))) }
            -> same_as<remove_cvref_t<Sch>>;
    } &&
    equality_comparable<remove_cvref_t<Sch>> &&
    copyable<remove_cvref_t<Sch>>;

  struct scheduler_t {};  // タグ型
}
```
* derived_from[link /reference/concepts/derived_from.md]
* sender[link sender.md]
* queryable[link ../queryable.md]
* get_completion_scheduler[link get_completion_scheduler.md.nolink]
* set_value_t[link set_value.md]
* get_env[link get_env.md.nolink]
* equality_comparable[link /reference/concepts/equality_comparable.md]
* copyable[link /reference/concepts/copyable.md]

## 概要
`scheduler`は、型`Sch`がScheduler型の要件を満たすことを表すコンセプトである。

下記をみたすクラス型はSchedulerとみなせる。

- `scheduler_t`をメンバ型`Sch::scheduler_concept`として定義するクラス
- [クエリ可能オブジェクト](../queryable.md)であること
- `Sch`型の値`sch`に対して下記が有効な式であること
    - [`execution::schedule`](schedule.md.nolink)`(sch)`が[Sender](sender.md)を返すこと
    - [`execution::get_completion_scheduler`](get_completion_scheduler.md.nolink)`<`[`set_value_t`](set_value.md)`>(`[`execution::get_env`](get_env.md.nolink)`(`[`execution::schedule`](schedule.md.nolink)`(sch)))`の結果が`Sch`型に等しいこと


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::run_loop loop;
  ex::scheduler auto sch = loop.get_scheduler();
}
```
* ex::scheduler[color ff0000]
* ex::run_loop[link run_loop.md.nolink]
* get_scheduler()[link run_loop/get_scheduler.md.nolink]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::schedule`](schedule.md.nolink)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
